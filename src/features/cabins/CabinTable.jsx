import Spinner from '../../ui/Spinner';
import CabinRow from "./CabinRow";
import Error from '../../ui/ErrorFallback';
import { useCabins } from "./useCabinFetch";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from 'react-router-dom';



//queryfn fetches data from the api... you can use fetch inside it 
export default function CabinTable() {

  
  const {isLoading, cabins, error} = useCabins();
  const [searchParams] = useSearchParams()

  if(isLoading) return <Spinner />

  if(error) return <Error />


  // 1) FILTER
  const filterValue = searchParams.get('discount') || 'all'
  console.log(filterValue);

  let filteredCabins;

  if(filterValue === 'all') filteredCabins = cabins;

  if(filterValue === 'no-discount') filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if(filterValue === 'with-discount') filteredCabins = cabins.filter((cabin)=> cabin.discount > 0);


  // 2) SORT
  // const sortBy = searchParams.get('sortBy') || "startDate-asc";
  // const [field, direction] = sortBy.split("-");

  // const modifier = direction === 'asc' ? 1 : -1;

  // const sortedCabins = filteredCabins.sort((a, b ) => (a[field] - b[field]) * modifier);
  // console.log(sortedCabins);
  
    const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  


  


  return (
  <Menus>

    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
      </Table.Header>
      
      {/* <Table.Body>
       {cabins.map((cabin)=> (<CabinRow cabin={cabin} key={
         cabin.id
        }/>))}
      </Table.Body> */}

      <Table.Body 
        // data={cabins} 
        // data={filteredCabins}
        data={sortedCabins}
        render={(cabin)=> (
        <CabinRow cabin={cabin} key={cabin.id}
        />)} 
      />
    </Table>
  </Menus>
  )
}
