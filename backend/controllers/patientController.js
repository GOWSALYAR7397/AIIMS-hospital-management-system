// controllers/patientController.js

// Example: temporary data (later DB connect pannuvom)
let patients = [
  { id: 1, name: "John Doe", age: 30, disease: "Fever" },
  { id: 2, name: "Jane Smith", age: 25, disease: "Cold" },
];

// @desc Get all patients
const getPatients = (req, res) => {
  res.json(patients);
};

// @desc Get patient by ID
const getPatientById = (req, res) => {
  const patient = patients.find((p) => p.id === parseInt(req.params.id));
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
};

// @desc Create new patient
const createPatient = (req, res) => {
  const newPatient = {
    id: patients.length + 1,
    name: req.body.name,
    age: req.body.age,
    disease: req.body.disease,
  };
  patients.push(newPatient);
  res.status(201).json(newPatient);
};

// @desc Update patient
const updatePatient = (req, res) => {
  const patient = patients.find((p) => p.id === parseInt(req.params.id));
  if (patient) {
    patient.name = req.body.name || patient.name;
    patient.age = req.body.age || patient.age;
    patient.disease = req.body.disease || patient.disease;
    res.json(patient);
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
};

// @desc Delete patient
const deletePatient = (req, res) => {
  patients = patients.filter((p) => p.id !== parseInt(req.params.id));
  res.json({ message: "Patient deleted" });
};

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
