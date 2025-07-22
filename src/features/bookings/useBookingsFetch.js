import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBooking";

  
  export function useBookingsfetch(){

    const { isLoading, data:bookings, error,} = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  })

  return {isLoading, bookings, error }
    
}