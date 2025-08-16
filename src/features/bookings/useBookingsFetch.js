import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBooking";

import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";


export function useBookingsfetch() {

  //TO QUERY
  const queryClient = useQueryClient();
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


  //PAGINATION
   //getting page from the url
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));


  //QUERY
  const {
    isLoading,
    data: {data:bookings, count} = {},  
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });


  //PRE-FETCHING
  
  //To prevent additional page fetch
  const pageCount = Math.ceil(count / PAGE_SIZE)

  if(page < pageCount)

  queryClient.prefetchQuery({
  queryKey: ["bookings", filter, sortBy, page + 1],
  queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
})

if(page > pageCount)

  queryClient.prefetchQuery({
  queryKey: ["bookings", filter, sortBy, page - 1],
  queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
})


  return { isLoading, error, bookings, count };
}


//READ UP INFINTEQUERIES FOR INFINITE SCROLL ON REACT QUERY




