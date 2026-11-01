"""Generate public/resume.pdf from your details. Run: python3 scripts/make_resume.py
Edit the DATA block below (or replace public/resume.pdf with your own PDF).
Requires: pip install reportlab"""
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, ListFlowable, ListItem

DATA = {
    "name": "Tharun Kumar Reddy",
    "headline": "Frontend Developer (Fresher)",
    # TODO(edit): add your email / phone / LinkedIn here
    "contact": "Hyderabad, Telangana, India  |  bogalatharunkumarreddy143@gmail.com  |  github.com/BogalaTharunKumarReddy",
    "summary": "Information Technology undergraduate seeking a fresher frontend role. Builds websites and projects with HTML, CSS, JavaScript and ReactJS, "
               "uses AI tools to build and debug faster, and has completed data analysis courses.",
    "education": [("B.Tech, Information Technology", "Malla Reddy University, Hyderabad", "2024 - 2028 (expected)")],
    "skills": [
        ("Frontend", "HTML, CSS, JavaScript, Bootstrap, ReactJS"),
        ("Databases", "MySQL"),
        ("Data Analysis", "Data Analysis, Exploratory Data Analysis, Data Visualisation"),
        ("Other", "AI-assisted development"),
    ],
    # TODO(verify): keep these in sync with src/data/projects.ts
    "certs": [
        ("Data Engineering Virtual Internship, AICTE - EduSkills (AWS Academy curriculum)", "Jan - Mar 2026, 10 weeks, Grade O (Outstanding)"),
        ("Web Development Internship Program, InternLink", "Certificate of Completion, 30 Dec 2025"),
        ("Nasscom FutureSkills Prime: Data Processing and Visualisation", "Gold, 77%, Sep 2026"),
        ("Nasscom FutureSkills Prime: Acquiring Data", "Gold, 92%, Sep 2026"),
        ("Nasscom FutureSkills Prime: Exploratory Data Analysis", "Silver, 60%, Sep 2026"),
    ],
    "projects": [
        ("Student Hostel Management System", "ReactJS, MySQL",
         ["Web application to manage residents, room allocation, fees and complaints.",
          "Designed the relational data model and role-based admin and student screens."]),
        ("CampusConnect", "ReactJS, JavaScript, HTML, CSS",
         ["Campus community platform for announcements and events with a mobile-first interface.",
          "Built a reusable component library for consistent screens."]),
        ("Customer Churn Prediction System", "Data Analysis",
         ["Machine learning workflow to estimate customer churn risk.",
          "Cleaned data, engineered features and compared classification models using precision, recall and F1."]),
    ],
}

NAVY, CYAN = colors.HexColor("#0b1d4a"), colors.HexColor("#0e7490")
h_name = ParagraphStyle("n", fontName="Times-Bold", fontSize=24, textColor=NAVY, leading=28)
h_role = ParagraphStyle("r", fontName="Times-Roman", fontSize=12, textColor=CYAN, leading=16)
small = ParagraphStyle("s", fontName="Times-Roman", fontSize=9.5, textColor=colors.HexColor("#475569"), leading=13)
body = ParagraphStyle("b", fontName="Times-Roman", fontSize=10, textColor=colors.HexColor("#1e293b"), leading=14)
h_sec = ParagraphStyle("h", fontName="Times-Bold", fontSize=11, textColor=NAVY, leading=14, spaceBefore=12, spaceAfter=2)
item = ParagraphStyle("i", parent=body, fontName="Times-Bold")

def section(title):
    return [Paragraph(title.upper(), h_sec), HRFlowable(width="100%", thickness=0.8, color=CYAN, spaceAfter=6)]

def build(path):
    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=16*mm, bottomMargin=14*mm,
                            title=f"{DATA['name']} - Resume", author=DATA["name"])
    s = [Paragraph(DATA["name"], h_name), Paragraph(DATA["headline"], h_role), Spacer(1, 3), Paragraph(DATA["contact"], small)]
    s += section("Summary") + [Paragraph(DATA["summary"], body)]
    s += section("Education")
    for degree, school, years in DATA["education"]:
        s += [Paragraph(degree, item), Paragraph(f"{school}  |  {years}", small)]
    s += section("Technical skills")
    for k, v in DATA["skills"]:
        s.append(Paragraph(f"<b>{k}:</b> {v}", body))
    s += section("Internships & certifications")
    for t, d in DATA["certs"]:
        s += [Paragraph(f"<b>{t}</b>", body), Paragraph(d, small), Spacer(1, 3)]
    s += section("Projects")
    for title, stack, bullets in DATA["projects"]:
        s += [Paragraph(f"{title}  <font size=9 color='#0e7490'>({stack})</font>", item),
              ListFlowable([ListItem(Paragraph(b, body), leftIndent=10) for b in bullets], bulletType="bullet", start="-", leftIndent=12),
              Spacer(1, 4)]
    doc.build(s)

if __name__ == "__main__":
    out = Path(__file__).resolve().parent.parent / "public" / "resume.pdf"
    build(out)
    print("wrote", out)
