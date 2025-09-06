import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBooking";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter((stay) => stay.status === 'checked-in' || stay.status === 'checked-out')

  return { isLoading, stays, confirmedStays, numDays };
}


















// import { useQuery } from "@tanstack/react-query";
// import { subDays } from "date-fns";
// import { useSearchParams } from "react-router-dom";
// import { getBookingsAfterDate } from "../../services/apiBooking"

// export function useRecentBookings() {
//     const[searchParams] = useSearchParams();

//     const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

//     const queryDate = subDays(new Date(), numDays).toISOString(); //num days here helps save day in cache

//     const { isLoading, data: bookings } = useQuery({
//         queryFn: () => getBookingsAfterDate(queryDate),
//         queryKey: ["bookings", `last-${numDays}`], //Like an array in an effect
//     })


//     return { isLoading, bookings}
// }


