from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI(title="MediReach AI Core", version="1.0.0")

# allow the React dev server and any local origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PatientData(BaseModel):
    symptoms: list[str]
    blood_pressure: str
    oxygen_level: int
    pulse_rate: int
    temperature: float


# simple lookup that maps common symptoms to likely diseases
SYMPTOM_MAP = {
    "fever": "Viral Fever",
    "headache": "Migraine",
    "chest pain": "Cardiac Risk",
    "cough": "Upper Respiratory Infection",
    "breathlessness": "Asthma",
    "fatigue": "Anemia",
    "vomiting": "Gastroenteritis",
    "diarrhea": "Gastroenteritis",
    "joint pain": "Rheumatoid Arthritis",
    "rash": "Dermatitis",
}

DEPARTMENT_MAP = {
    "Viral Fever": "General Medicine",
    "Migraine": "Neurology",
    "Cardiac Risk": "Cardiology",
    "Upper Respiratory Infection": "Pulmonology",
    "Asthma": "Pulmonology",
    "Anemia": "General Medicine",
    "Gastroenteritis": "Gastroenterology",
    "Rheumatoid Arthritis": "Orthopedics",
    "Dermatitis": "Dermatology",
}


@app.get("/health")
def health_check():
    return {"status": "AI services are running and ready."}


@app.post("/api/ai/symptom-checker")
def check_symptoms(data: PatientData):
    """
    Mock AI diagnosis endpoint.
    Picks the most relevant disease from the symptom map,
    then adjusts the risk level using the vitals that were sent in.
    """
    matched_disease = None
    for symptom in data.symptoms:
        key = symptom.strip().lower()
        if key in SYMPTOM_MAP:
            matched_disease = SYMPTOM_MAP[key]
            break

    # fallback if none of the symptoms matched our lookup
    if matched_disease is None:
        matched_disease = random.choice(list(SYMPTOM_MAP.values()))

    department = DEPARTMENT_MAP.get(matched_disease, "General Medicine")

    # figure out how risky this patient is from their vitals
    if data.oxygen_level < 92 or data.pulse_rate > 120:
        risk = "High"
    elif data.temperature > 100 or data.pulse_rate > 100:
        risk = "Medium"
    else:
        risk = "Low"

    confidence = round(random.uniform(78.0, 97.5), 2)

    first_aid_tips = {
        "High": "Seek immediate medical attention. Keep the patient calm and in a resting position.",
        "Medium": "Stay hydrated, monitor vitals every 30 minutes, and rest.",
        "Low": "Rest well, stay hydrated, and follow up if symptoms persist beyond 48 hours.",
    }

    return {
        "possible_disease": matched_disease,
        "confidence_percentage": confidence,
        "risk_level": risk,
        "suggested_department": department,
        "first_aid": first_aid_tips[risk],
        "recommended_tests": ["CBC", "Chest X-Ray"] if risk != "Low" else ["CBC"],
    }
