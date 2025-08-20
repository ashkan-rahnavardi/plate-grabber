# PlateGrabber — License Plate Extraction Tool for City Traffic Workflows

## Overview
**PlateGrabber** is a web application designed for the **Traffic Department of the City of Vancouver**. It enables city employees to quickly capture photos of parked cars and automatically extract **license plate numbers** along with **geo-location data**, replacing the manual pen-and-paper process.  

I built PlateGrabber as a **solo project** while working at the City of Vancouver, after observing the inefficiency of writing down plate numbers by hand.  

---

## Problem
When traffic employees installed **No Parking** signs, they were required to record all vehicles parked on the street.  
- Traditionally, this was done by manually writing license plates on paper.  
- The process was **slow**, **error-prone**, and required additional steps to transfer data.  

---

## Solution
PlateGrabber streamlined this process by:  
- Allowing employees to **take photos** of vehicles directly in the app.  
- Using a **plate recognition API** to extract license plate numbers.  
- Attaching the **photo’s geolocation metadata** to automatically fill forms.  

This reduced manual effort, increased accuracy, and opened the door for broader workflow automation.

---

## Tech Stack
- **Frontend:** React, Next.js 14, ShadCN UI  
- **Authentication:** NextAuth v5  
- **Database:** MongoDB (prototype stage)  
- **APIs:** Plate Recognition API (OCR), Geolocation metadata  
- **Camera Access:** React Camera Pro (custom-modified for stability)  

---

## Development Process
- **Sprint 1 (MVP):**  
  - Built a local-only prototype that captured photos and extracted plate numbers.  
  - Proved core functionality without a backend.  

- **Sprint 2 (Iteration):**  
  - Added MongoDB integration for persistent storage.  
  - Redesigned the interface with ShadCN components.  
  - Scoped security requirements after discussions with the city (local servers, encryption, personal data policies).  

---

## Features
- 📸 **Photo capture** with built-in camera support.  
- 🔠 **Automatic plate extraction** via OCR API.  
- 🌍 **Geo-tagging** using photo metadata.  
- 🗂️ **Form auto-fill** for traffic workflows.  
- 🔒 (Planned) Secure, encrypted local database storage.  
- 📅 (Planned) Daily assignments for employees (task-based workflow).  

---

## Results
- Demonstrated the MVP to the **department superintendent and assistant**, who expressed strong interest.  
- Identified hurdles with city IT adoption (data storage compliance, procurement).  
- Did not move forward due to shifting focus to paid freelance projects, but the prototype validated the **real-world need** and potential impact.  

---

## Learnings
- **API Integrations:** Gained hands-on experience integrating OCR and location services.  
- **Architecture Planning:** Learned the importance of designing scalable, modular systems from the start.  
- **Stakeholder Discovery:** Practiced gathering requirements from non-technical stakeholders.  

If I were to rebuild PlateGrabber today, I would:  
- Scope out a **2-year roadmap** before coding.  
- Design the MVP to fit into a scalable system.  
- Prioritize **local server deployment** from the start to meet city security requirements.  

---

## Status
- **MVP Live (local-only storage version)** – not maintained due to expired API key.  
- Prototype with MongoDB + ShadCN UI partially implemented.  
- Future potential to expand to other cities’ traffic departments.  

---
