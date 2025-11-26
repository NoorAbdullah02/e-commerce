import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails, logout, checkTokenValidation } from '../actions/userActions'
import { useHistory } from 'react-router-dom'

function AccountPage() {
  let history = useHistory()
  const dispatch = useDispatch()

  const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
  const { error: tokenError } = checkTokenValidationReducer

  const userLoginReducer = useSelector(state => state.userLoginReducer)
  const { userInfo } = userLoginReducer

  const userDetailsReducer = useSelector(state => state.userDetailsReducer)
  const { user: userAccDetails, loading } = userDetailsReducer

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      try {
        dispatch(checkTokenValidation())
        dispatch(userDetails(userInfo.id))
      } catch (error) {
        history.push("/")
      }
    }
  }, [history, userInfo, dispatch])

  const logoutHandler = () => {
    dispatch(logout())
  }

  if (userInfo && tokenError === "Request failed with status code 401") {
    alert("Session expired, please login again.")
    dispatch(logout())
    history.push("/login")
    window.location.reload()
  }

  const renderData = () => {
    try {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#ffffff',
          padding: '40px 20px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes float {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              33% { transform: translate(30px, -30px) rotate(120deg); }
              66% { transform: translate(-20px, 20px) rotate(240deg); }
            }
            @keyframes float2 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(-40px, 40px) scale(1.1); }
            }
            .fade-in { animation: fadeIn 0.6s ease-out forwards; }
            .slide-up { animation: slideInUp 0.6s ease-out forwards; }
            .delay-100 { animation-delay: 0.1s; opacity: 0; }
            .delay-200 { animation-delay: 0.2s; opacity: 0; }
            .delay-300 { animation-delay: 0.3s; opacity: 0; }
            .delay-400 { animation-delay: 0.4s; opacity: 0; }
          `}</style>

          {/* Animated Background */}
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            opacity: '0.08',
            filter: 'blur(60px)',
            animation: 'float 20s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '50%',
            opacity: '0.08',
            filter: 'blur(80px)',
            animation: 'float2 25s ease-in-out infinite'
          }}></div>

          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative'
          }}>
            {/* Header */}
            <div className="fade-in" style={{
              textAlign: 'center',
              marginBottom: '50px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 30px rgba(102, 126, 234, 0.25)',
                transform: 'rotate(-5deg)',
                transition: 'transform 0.3s ease'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 10px',
                letterSpacing: '-0.5px'
              }}>My Account</h1>
              <p style={{
                color: '#718096',
                fontSize: '16px',
                margin: 0
              }}>Manage your account information and preferences</p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="fade-in" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '30px',
                background: '#f7fafc',
                borderRadius: '16px',
                marginBottom: '30px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '3px solid #e2e8f0',
                  borderTop: '3px solid #667eea',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#4a5568'
                }}>Getting User Information...</span>
              </div>
            )}

            {/* Account Details Card */}
            <div className="slide-up delay-100" style={{
              background: '#ffffff',
              borderRadius: '24px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              marginBottom: '30px'
            }}>
              {/* Username Row */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid #e2e8f0',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f7fafc'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <div style={{
                  flex: '0 0 200px',
                  padding: '24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Name
                </div>
                <div style={{
                  flex: '1',
                  padding: '24px',
                  fontSize: '16px',
                  color: '#2d3748',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {userAccDetails.username}
                </div>
              </div>

              {/* Email Row */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid #e2e8f0',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f7fafc'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <div style={{
                  flex: '0 0 200px',
                  padding: '24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Email
                </div>
                <div style={{
                  flex: '1',
                  padding: '24px',
                  fontSize: '16px',
                  color: '#2d3748',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {userAccDetails.email}
                </div>
              </div>

              {/* Admin Privileges Row */}
              <div style={{
                display: 'flex',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f7fafc'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <div style={{
                  flex: '0 0 200px',
                  padding: '24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                  Admin Privileges
                </div>
                <div style={{
                  flex: '1',
                  padding: '24px',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: userAccDetails.admin ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                    color: 'white'
                  }}>
                    {userAccDetails.admin ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="slide-up delay-200" style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                to="/account/update"
                style={{
                  padding: '14px 30px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'white',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Update Account
              </Link>

              <Link
                to="/account/delete"
                style={{
                  padding: '14px 30px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#dc2626',
                  background: 'white',
                  border: '2px solid #dc2626',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#dc2626'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.color = '#dc2626'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Delete Account
              </Link>
            </div>
          </div>
        </div>
      )
    } catch (error) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#fed7d7',
            color: '#c53030',
            padding: '20px 24px',
            borderRadius: '12px',
            maxWidth: '500px',
            border: '1px solid #fc8181',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: '600' }}>
              ⚠️ Something went wrong
            </p>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Go back to{' '}
              <Link
                onClick={logoutHandler}
                to="/login"
                style={{
                  color: '#c53030',
                  fontWeight: '600',
                  textDecoration: 'underline'
                }}
              >
                Login
              </Link>
              {' '}page.
            </p>
          </div>
        </div>
      )
    }
  }

  return renderData()
}

export default AccountPage