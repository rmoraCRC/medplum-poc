import { createReference, MedplumClient } from "@medplum/core";
import {
 AllergyIntolerance,
 DiagnosticReport,
 Patient,
 Questionnaire,
} from "@medplum/fhirtypes";

export const addPatient = async (): Promise<Patient | null> => {
 const medplum = new MedplumClient();
 medplum
  .startClientLogin(
   process.env.REACT_APP_MEDPLUM_CLIENT_ID || "",
   process.env.REACT_APP_MEDPLUM_CLIENT_SECRET || ""
  )
  .catch((error) => {
   console.log(error);
  });

 const createdPatient = await medplum.createResource({
  resourceType: "Patient",
  name: [
   {
    given: ["Rafael"],
    family: "Mora",
   },
  ],
 });

 return createdPatient || null;
};

export const addNote = async (
 patient: Patient
): Promise<DiagnosticReport | null> => {
 const medplum = new MedplumClient();
 medplum
  .startClientLogin(
   process.env.REACT_APP_MEDPLUM_CLIENT_ID || "",
   process.env.REACT_APP_MEDPLUM_CLIENT_SECRET || ""
  )
  .catch((error) => {
   console.log(error);
  });

 const createdNote = await medplum.createResource({
  resourceType: "DiagnosticReport",
  subject: createReference(patient),
  text: { div: "This is a demo Report", status: "additional" },
  status: "preliminary",
  conclusion: "This is a demo Report",
  code: { text: "Progress note" },
 });

 return createdNote || null;
};

export const addAllergy = async (
 patient: Patient
): Promise<AllergyIntolerance | null> => {
 const medplum = new MedplumClient();
 medplum
  .startClientLogin(
   process.env.REACT_APP_MEDPLUM_CLIENT_ID || "",
   process.env.REACT_APP_MEDPLUM_CLIENT_SECRET || ""
  )
  .catch((error) => {
   console.log(error);
  });

 const createdAllergy = await medplum.createResource({
  resourceType: "AllergyIntolerance",
  patient: createReference(patient),
  text: { div: "This is a demo Allergy", status: "empty" },
  type: "allergy",
  category: ["food"],
  criticality: "high",
  note: [{ authorString: "Test Author", text: "Test allergy Note" }],
  reaction: [
   {
    description: "test reaction",
    severity: "moderate",
    manifestation: [{ text: "test manifestation" }],
   },
  ],
 });

 return createdAllergy || null;
};

export const findAllergy = async (
 id: string | undefined
): Promise<AllergyIntolerance | null> => {
 if (!id) return null;
 const medplum = new MedplumClient();
 medplum
  .startClientLogin(
   process.env.REACT_APP_MEDPLUM_CLIENT_ID || "",
   process.env.REACT_APP_MEDPLUM_CLIENT_SECRET || ""
  )
  .catch((error) => {
   console.log(error);
  });

 const createdAllergy = await medplum.readResource("AllergyIntolerance", id);

 return createdAllergy || null;
};
