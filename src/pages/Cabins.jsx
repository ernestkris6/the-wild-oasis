import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";



function Cabins() {

  useEffect(function(){
    getCabins().then((data)=> console.log(data)
    )
  }, [])

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img style={{width:'480px'}} src="https://cewpohjcjinpewggeqxh.supabase.co/storage/v1/object/public/cabins-image//cabin-006.jpg" alt="cabins image" />
    </Row>
  );
}

export default Cabins;