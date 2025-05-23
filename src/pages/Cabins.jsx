import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
// import { getCabins } from "../services/apiCabins";



function Cabins() {

  const [showForm, setShowForm] = useState(false)
  // useEffect(function(){
  //   getCabins().then((data)=> console.log(data)
  //   )
  // }, [])

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter/Sort</p>
      {/* <img style={{width:'480px'}} src="https://cewpohjcjinpewggeqxh.supabase.co/storage/v1/object/public/cabins-image//cabin-006.jpg" alt="cabins image" /> */}
    </Row>

    <Row>
      <CabinTable />

      <Button onClick={()=> setShowForm((show) => !show)}>Add new cabin</Button>
      {showForm && <CreateCabinForm />}
    </Row>
    </>
  );
}

export default Cabins;





































