import Row from "../ui/Row";
import Heading from "../ui/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return ( 
        <Row>
          <Heading>Update Hotel settings</Heading>
          <UpdateSettingsForm />
        </Row>
      )
}

export default Settings;