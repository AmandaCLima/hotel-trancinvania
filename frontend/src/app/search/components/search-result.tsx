import { Box, Flex, Heading, HStack, Spacer, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IPublishedReservations, ISearch } from "../../search/models";
import { getPromotionById, getPublishedReservationsByFilters, getRatingById } from "../services";
import { toast } from "react-toastify";
import { StarIcon } from "@chakra-ui/icons";
import { PromotionModel } from "../../Promotion/models/promotion";
import morcegoImg from './bat.png';


export const SearchResult = () => {


    const [queryParams] = useSearchParams();
    const [search, setSearch] = useState<ISearch>();
    const [reservations, setReservations] = useState<IPublishedReservations[]>([]);
    const [promotion, setPromotion] = useState<PromotionModel>({} as PromotionModel);

    useEffect(() => {

        const handleSearch = async () => {
            const city = queryParams.get("city");
            const checkin = queryParams.get("checkin");
            const checkout = queryParams.get("checkout");
            const num_adults = queryParams.get("num_adults");
            const num_children = queryParams.get("num_children");
            const num_rooms = queryParams.get("num_rooms");
    
            if(!city || !checkin || !checkout || !num_adults || !num_children || !num_rooms){
                return;
            }

            setSearch({
                city: city,            
                checkin: checkin,
                checkout: checkout,
                num_adults: parseInt(num_adults),
                num_children: parseInt(num_children),
                num_rooms: parseInt(num_rooms)
            })
        }

        handleSearch();
    }, []);

    const handlePromotion = async (reservation_id: number) => {
        try {
            const data = await getPromotionById(reservation_id);
            const discount = data.discount ?? 0;
            setPromotion((prevPromotions) => ({
                ...prevPromotions,
                [reservation_id]: discount,
            }));
        } catch (error: any) {
            console.error('Erro ao obter promoção:', error.response ? error.response : error);
        }
    };

    const handleRating = async (reservation_id: number) => {
        let rating = 0;
        let num = 0;
        try {
            const ratings = await getRatingById(reservation_id);

            ratings.forEach((rate) => {
                rating += rate.rating;
                num++;
            })

            if(num > 0){
                return rating / num;
            }        
        } catch (error) {
            console.error('Erro ao obter promoção:', error);
        } 

        return 0;
    }

    const calculateData = async (reservas: IPublishedReservations[]) => {

        let newReservas = Promise.all(reservas.map(async (reserva) => {
            handlePromotion(reserva.id);

            reserva.rating = await handleRating(reserva.id);
            return reserva;
        })
)

        return newReservas;
    }

    useEffect(() => {
        let reservas = reservations.map((reserva) => {
            let promocao = promotion[reserva.id];
            if(promocao){
                reserva.new_price = reserva.price * (1 - promocao / 100);
            }
            console.log(promocao)

            return reserva;
        })

        setReservations(reservas);
    }, [promotion])

    useEffect(() => {
        const fetchSearch = async () => {
            if(search){
                let response;
                try{
                  response = await getPublishedReservationsByFilters(search);
                  
                } catch (error ){
                  const err = error as any;
                  if(err.response.status == 400){
                      toast.warning('Um erro ocorreu')
                  }
        
                  return;
                }

                // console.log(response);
                
                let reservationsFinal = await calculateData(response);

                // console.log(promotion)

                setReservations(reservationsFinal);


            }
        }
        fetchSearch()
    }, [search])

    const navigate = useNavigate();

    return (
    <Box mt={12} p={0} minH="500px" position="relative">
        <Box position="relative" zIndex="1">
        <Text fontSize="6xl" m={3} fontFamily="trancinfont" letterSpacing={"-0.07em"}>
            resulTados de busca
        </Text>
        <Flex flexWrap="wrap" gap="75px" mt="30px" fontFamily="Inter">
        {reservations.length == 0 && <Box fontFamily="Inter" mx={3} fontSize="xl" id="reservenotfound">Nenhuma reserva foi encontrada</Box>}
        {reservations.map(reservation => (
            <Box key={reservation.id} position="relative" w="250px" h="300px" _hover={{transform: 'translateY(-5px)'}}>
                {reservation.promotion_id && (
                    <Flex alignItems="center" justifyContent="center" color="#eaeaea" fontSize="20px" textAlign="center" position="absolute" bottom="77%" left="80%" width="90px" height="90px" backgroundSize="contain" backgroundRepeat="no-repeat" zIndex="1" style={{ backgroundImage: `url(${morcegoImg})` }}> <Box transform={'translateY(-60%)'} fontSize="13px">{promotion[reservation.id] !== 0 && `${promotion[reservation.id]}%`}</Box></Flex>
                )}
                <Box position="relative" w="270px" h="300px" bg="transparent"  borderRadius="10px" overflow="hidden" color="#191919" cursor="pointer" key={reservation.id} onClick={() => navigate(`/select-reservation/${reservation.id}`)}>
                    <Box w="100%" h="72%" backgroundSize="cover" backgroundPosition="center" borderBottomLeftRadius="10px" borderBottomRightRadius="10px"  style={{backgroundImage: `url(http://localhost:5001${reservation.imageUrl})`}}></Box>
                    <Flex justify="center" align="center">
                        <Box fontSize="20px" color="#eaeaea" textAlign="start" fontWeight="bold" data-cy="reservation_name">{reservation.name}</Box>
                        <Spacer />
                        <Box color="#eaeaea" textAlign="start">
                            <HStack>
                                <Text fontSize="20px" fontWeight="bold">
                                    {reservation.rating}
                                </Text>
                                <StarIcon 
                                    height="15px"
                                    width="15px"
                                />
                            </HStack>
                        </Box>
                    </Flex>
                    <Flex textAlign="start" fontSize="20px" color="#eaeaea">
                        <Text data-cy="reservation_price">
                            {reservation.new_price.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}
                        </Text>

                        { reservation.promotion_id &&   <Box fontSize="15px" textDecoration="line-through" mx="5px" mt="3px">{reservation.price.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</Box>} a diária</Flex>
                </Box>
            </Box>
        ))}
        </Flex>
        </Box>
    </Box>
    )
}