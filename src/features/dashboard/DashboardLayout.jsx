import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabinFetch";
import Spinner from "../../ui/Spinner"
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";


const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


//In this app an activity means there is a guest arriving or leaving the hotel at that day

export default function DashboardLayout() {

  const { bookings, isLoading} = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays} = useRecentStays(); //stays,
  const { cabins, isLoading: isLoading3 } = useCabins();

  if(isLoading || isLoading2 || isLoading3) return <Spinner />

  console.log(bookings);
  

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}/>
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}
