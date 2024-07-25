import { useState, useEffect } from 'react';
import { Box, Button, Flex, Textarea, Text } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { rateReservation, editRateReservation, getRatesByClientId } from '../../services'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBar } from '../../../../shared/components/nav-bar';
import { BottomLeftTopRightImages } from '../../../../shared/components/spider-images';
import { RateModel } from '../../models';
import { useClientData } from '../../../auth/hooks/useUserData';

export const Rating = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  const { data } = useClientData();
  const client_id = Number(data?.id);
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comments, setComments] = useState('');
  const [existingRate, setExistingRate] = useState<RateModel | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const allRates: RateModel[] = await getRatesByClientId(client_id);
        const rate = allRates.find(rate => rate.reservation_id === Number(reservationId));
        if (rate) {
          setRating(rate.rating);
          setComments(rate.comments || '');
          setExistingRate(rate);
        }
      } catch (error) {
        toast.error('Erro ao buscar avaliação existente. Tente novamente.');
      }
    };

    fetchRate();
  }, [reservationId, client_id]);

  const handleRatingSubmit = async () => {
    try {
      if (existingRate) {
        // Editar avaliação existente
        await editRateReservation(client_id, Number(reservationId), {
          rating,
          comments,
        });
        toast.success('Avaliação atualizada com sucesso!');
      } else {
        // Criar nova avaliação
        await rateReservation({
          client_id,
          reservation_id: Number(reservationId),
          rating,
          comments,
        });
        toast.success('Avaliação enviada com sucesso!');
      }
      setTimeout(() => {
        navigate('/client/profile/rate');
      }, 2000);
    } catch (error) {
      toast.error('Erro ao enviar avaliação. Tente novamente.');
    }
  };

  return (
    <Box bg="#191919" minH="100vh" display="flex" flexDirection="column">
      <NavBar />
      <BottomLeftTopRightImages />
      <Box display="flex" flexDirection="column" alignItems="center" p="50px">
        <Text fontFamily="Trancinfont" fontSize="35px" mb="20px" color="#eaeaea">Avaliar Reserva</Text>
        <Flex flexDirection="row" mb="20px">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  style={{ display: 'none' }}
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                  size={50}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </Flex>
        <Textarea
          placeholder="Deixe seu comentário (opcional)"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          mb="20px"
          color="#eaeaea"
          bg="#333"
          border="none"
          _focus={{ outline: 'none' }}
          width="300px"
        />
        <Button
          onClick={handleRatingSubmit}
          bg="#6A0572"
          color="#eaeaea"
          _hover={{ bg: '#eaeaea', color: '#6A0572' }}
          disabled={rating === 0}
        >
          Enviar Avaliação
        </Button>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default Rating;
