import React, { useState } from "react";
import { addPatient, addNote, addAllergy, findAllergy } from "./services/resources";
import { Header, Item } from "semantic-ui-react";
import {
 Patient,
 DiagnosticReport,
 AllergyIntolerance,
} from "@medplum/fhirtypes";

const App = () => {
 const [createdPatient, setCreatedPatient] = useState<Patient | null>();
 const [createdNote, setCreatedNote] = useState<DiagnosticReport | null>();
 const [createdAllergy, setCreatedAllergy] =
  useState<AllergyIntolerance | null>();

const [foundAllergy, setFoundAllergy] =
  useState<AllergyIntolerance | null>();

 return (
  <div style={{ marginTop: 50, paddingLeft: 50 }}>
   <Header>Medplum POC</Header>
   <Item.Group>
    <Item>
     <Item.Content>
      <Item.Header
       as="Button"
       onClick={async () => {
        const patient = await addPatient();
        setCreatedPatient(patient);
       }}
      >
       Add Patient
      </Item.Header>
      <Item.Meta>Id: {createdPatient?.id} </Item.Meta>
      <Item.Description></Item.Description>
      <Item.Extra>{JSON.stringify(createdPatient)}</Item.Extra>
     </Item.Content>
    </Item>
    <Item>
     <Item.Content>
      <Item.Header
       as="Button"
       onClick={async () => {
        if (createdPatient) {
         const note = await addNote(createdPatient);
         setCreatedNote(note);
        }
       }}
      >
       Add Session / Note
      </Item.Header>
      <Item.Meta>Id: {createdNote?.id} </Item.Meta>
      <Item.Description></Item.Description>
      <Item.Extra>{JSON.stringify(createdNote)}</Item.Extra>
     </Item.Content>
    </Item>
    <Item>
     <Item.Content>
      <Item.Header
       as="Button"
       onClick={async () => {
        if (createdPatient) {
         const allergy = await addAllergy(createdPatient);
         setCreatedAllergy(allergy);
        }
       }}
      >
       Add Allergies
      </Item.Header>
      <Item.Meta>Id: {createdAllergy?.id} </Item.Meta>
      <Item.Description></Item.Description>
      <Item.Extra>{JSON.stringify(createdAllergy)}</Item.Extra>
     </Item.Content>
    </Item>
    <Item>
     <Item.Content>
      <Item.Header
       as="Button"
       onClick={async () => {
        if (createdAllergy) {
         const allergy = await findAllergy(createdAllergy?.id);
         setFoundAllergy(allergy);
        }
       }}
      >
       Find Created Allergy
      </Item.Header>
      <Item.Meta>Id: {foundAllergy?.id} </Item.Meta>
      <Item.Description></Item.Description>
      <Item.Extra>{JSON.stringify(foundAllergy)}</Item.Extra>
     </Item.Content>
    </Item>
   </Item.Group>
  </div>
 );
};

export default App;
