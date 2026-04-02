import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setUserEmail, setUserBio } from '../store/slices/uiSlice';
import '../styles/settings.css';

/**
 * Settings Page Component
 *
 * Displays user profile information (admin only).
 * Shows user details including avatar, name, email, and bio.
 * Allows editing of name, email, and bio fields.
 */
export default function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.ui.user);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    dispatch(setUserName(formData.name));
    dispatch(setUserEmail(formData.email));
    dispatch(setUserBio(formData.bio));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h2>Settings</h2>
      </div>

      <div className="settings-container">
        <div className="profile-card">
          <div className="profile-image-wrapper">
            <img
              src={user.image}
              alt={user.name}
              className="profile-image"
            />
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="profile-textarea"
                rows="3"
              />
            </div>

            <button onClick={handleSave} className="save-button">
              Save Changes
            </button>

            {isSaved && <p className="save-message">Changes saved successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
