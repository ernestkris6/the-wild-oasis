import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBooking";

import { useSearchParams } from "react-router-dom";


export function useBookingsfetch() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };


  //SORT BY
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {field, direction} 


  const {
    isLoading,
    data: bookings,  
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy,],
    queryFn: () => getBookings({ filter, sortBy }),
  });


 
  return { isLoading, error, bookings };
}

























// import { useQuery } from "@tanstack/react-query";
// import { getBookings } from "../../services/apiBooking";

  
//   export function useBookingsfetch(){

//     const { isLoading, data:bookings, error,} = useQuery({
//     queryKey: ['bookings'],
//     queryFn: getBookings,
//   })

//   return {isLoading, bookings, error }
    
// }

//   const [searchParams] = useSearchParams();

//   // FILTER
//   const filterValue = searchParams.get("status");
//   const filter =
//     !filterValue || filterValue === "all"
//       ? null
//       : { field: "status", value: filterValue };
//   // { field: "totalPrice", value: 5000, method: "gte" };

//   // SORT
//   const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
//   const [field, direction] = sortByRaw.split("-");
//   const sortBy = { field, direction };

//   // PAGINATION
//   const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

//   // QUERY
//   const {
//     isLoading,
//     data: { data: bookings, count } = {},
//     error,
//   } = useQuery({
//     queryKey: ["bookings", filter, sortBy, page],
//     queryFn: () => getBookings({ filter, sortBy, page }),
//   });
