import { useEffect, useState } from "react";
import DashboardTitle from "../../components/DashboardTitle";
import ReportCard from "../../components/ReportCard";
import { deleteReport, fetchReports } from "../../services/api";

const Reports = () => {

  const [ reports, setReports ] = useState([]);

  useEffect(() => {
    const fetchReportsData = async () => {
      const reports = await fetchReports();

      setReports(reports.reports);
    }

    fetchReportsData();
  }, []);

  const handleDelete = async (id) => {
    const response = await deleteReport(id);
      
    if (response.error) return;

    setReports(reports => reports.filter((report) => report.id !== id));
  }

  return (
    <DashboardTitle
      id="reports"
      title="Plaintes"
      subTitle="Liste des plaintes"
      description="Panneau administratif de gestion des plaintes"
    >
      <div className="reports-container">
        {reports.map((report) => {
          return (
            <ReportCard 
              key={report.id}
              id={report.id}
              profilePicture={report.userProfilePicture}
              login={report.userLogin}
              email={report.userEmail}
              description={report.description}
              reason={report.reason}
              date={new Date(report.date)}
              status={report.status}
              onDelete={() => { handleDelete(report.id) }}
              onStatusChange={() => { handleStatusChange(report.id) }}
            />
          )
        })}
      </div>
    </DashboardTitle>
  );
}

export default Reports;