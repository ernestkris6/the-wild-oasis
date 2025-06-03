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

  const filterValue = searchParams.get('discount') || 'all'
  console.log(filterValue);

  let filteredCabins;

  if(filterValue === 'all') filteredCabins = cabins;

  if(filterValue === 'no-discount') filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if(filterValue === 'with-discount') filteredCabins = cabins.filter((cabin)=> cabin.discount > 0);
  


  if(isLoading) return <Spinner />

  if(error) return <Error />



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
        data={filteredCabins}
        render={(cabin)=> (
        <CabinRow cabin={cabin} key={cabin.id}
        />)} 
      />
    </Table>
  </Menus>
  )
}
