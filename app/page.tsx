"use client";

export default function Home() {
  return (
    <>
      <style>{`
        .home-bg {
          min-height: 100vh;
          background: linear-gradient(120deg, #06141f, #0c2534, #091b28, #0c2534);
          background-size: 300% 300%;
          animation: headerFlow 14s ease infinite;
        }

        @keyframes headerFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .home-title {
          color: #ff8c1a;
          text-shadow: 0 0 12px rgba(255,140,26,0.7);
          font-weight: 700;
        }

        .home-lead {
          color: #fff;
          opacity: 0.85;
        }

        .custom-card {
          background: rgba(6,20,31,0.97);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.55),
                      0 0 0 2px rgba(255,140,26,0.08),
                      inset 0 1px 0 rgba(255,255,255,0.03);
          border: 2px solid rgba(255,140,26,0.18);
          transition: transform 0.22s cubic-bezier(.4,2,.6,1),
                      box-shadow 0.22s,
                      border-color 0.22s;
          min-height: 340px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 32px 18px 28px 18px;
        }

        .custom-card:hover {
          transform: translateY(-10px) scale(1.035);
          box-shadow: 0 18px 48px rgba(225,6,0,0.18),
                      0 10px 30px rgba(0,0,0,0.55);
          border-color: #ff8c1a;
        }

        .icon-dashboard {
          color: #ff8c1a;
          text-shadow: 0 0 8px rgba(255,140,26,0.6);
        }

        .icon-complaints {
          color: #ffffff;
          text-shadow: 0 0 8px rgba(255,255,255,0.5);
        }

        .icon-sos {
          color: #e10600;
          text-shadow: 0 0 14px rgba(225,6,0,0.7);
          animation: sosPulse 1.5s infinite;
        }

        .icon-admin {
          color: #ffb703;
          text-shadow: 0 0 8px rgba(255,183,3,0.5);
        }

        @keyframes sosPulse {
          0% { box-shadow: 0 0 0 rgba(225, 6, 0, 0); }
          50% { box-shadow: 0 0 14px rgba(225, 6, 0, 0.9); }
          100% { box-shadow: 0 0 0 rgba(225, 6, 0, 0); }
        }

        .custom-btn {
          font-weight: 600;
          border-radius: 10px;
          padding: 8px 18px;
          border: none;
          transition: all 0.25s;
        }

        .btn-dashboard {
          background: rgba(255,140,26,0.12);
          color: #ff8c1a;
          border: 1.5px solid #ff8c1a;
        }

        .btn-dashboard:hover {
          background: #ff8c1a;
          color: #fff;
        }

        .btn-complaints {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border: 1.5px solid #fff;
        }

        .btn-complaints:hover {
          background: #fff;
          color: #06141f;
        }

        .btn-sos {
          background: rgba(225,6,0,0.05);
          color: #e10600;
          border: 1.5px solid #e10600;
        }

        .btn-sos:hover {
          background: #e10600;
          color: #fff;
        }

        .btn-admin {
          background: rgba(255,183,3,0.18);
          color: #ffb703;
          border: 1.5px solid #ffb703;
        }

        .btn-admin:hover {
          background: #ffb703;
          color: #091b28;
        }

        @media (max-width: 991px) {
          .custom-card {
            min-height: 280px;
            padding: 24px 10px 20px 10px;
          }
        }

        @media (max-width: 767px) {
          .custom-card {
            min-height: 220px;
            padding: 16px 6px 14px 6px;
          }
        }
      `}</style>

      <div className="home-bg py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h1 className="display-4 home-title mb-2">
                Welcome to the Emergency System
              </h1>
              <p className="lead home-lead mb-0">
                Manage emergencies, complaints, and alerts efficiently. Use the
                dashboard to monitor activity, submit complaints, trigger SOS
                alerts, and access admin features.
              </p>
            </div>
          </div>

          <div className="row g-4 justify-content-center align-items-stretch">
            <div className="col-12 col-md-6 col-lg-3 d-flex">
              <div className="custom-card w-100">
                <div className="text-center w-100">
                  <div className="mb-3">
                    <i className="bi bi-speedometer2 display-5 icon-dashboard"></i>
                  </div>
                  <h5 className="card-title" style={{ color: "#ff8c1a", fontWeight: 700 }}>
                    Dashboard
                  </h5>
                  <p className="card-text home-lead">
                    Overview of all emergency activities and quick access to system stats.
                  </p>
                  <a href="/dashboard" className="custom-btn btn-dashboard">
                    Go to Dashboard
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 d-flex">
              <div className="custom-card w-100">
                <div className="text-center w-100">
                  <div className="mb-3">
                    <i className="bi bi-chat-dots display-5 icon-complaints"></i>
                  </div>
                  <h5 className="card-title" style={{ color: "#fff", fontWeight: 700 }}>
                    Complaints
                  </h5>
                  <p className="card-text home-lead">
                    Submit and track complaints. View complaint status and history.
                  </p>
                  <a href="/complaints" className="custom-btn btn-complaints">
                    View Complaints
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 d-flex">
              <div className="custom-card w-100">
                <div className="text-center w-100">
                  <div className="mb-3">
                    <i className="bi bi-exclamation-triangle display-5 icon-sos"></i>
                  </div>
                  <h5 className="card-title" style={{ color: "#e10600", fontWeight: 700 }}>
                    SOS Alerts
                  </h5>
                  <p className="card-text home-lead">
                    Trigger and monitor SOS alerts for immediate emergency response.
                  </p>
                  <a href="/sos" className="custom-btn btn-sos">
                    SOS Alerts
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 d-flex">
              <div className="custom-card w-100">
                <div className="text-center w-100">
                  <div className="mb-3">
                    <i className="bi bi-shield-lock display-5 icon-admin"></i>
                  </div>
                  <h5 className="card-title" style={{ color: "#ffb703", fontWeight: 700 }}>
                    Admin Panel
                  </h5>
                  <p className="card-text home-lead">
                    Administer users, manage system settings, and review reports.
                  </p>
                  <a href="/admin" className="custom-btn btn-admin">
                    Admin Panel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}