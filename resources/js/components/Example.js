import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../sass/example.scss';

const Example = () => {
  const [contacts, setContacts] = useState([]);
  const [view, setView] = useState('active'); // active or archivedd
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch contacts based on view (archived 0 = active, 1 = archived)
  useEffect(() => {
    const archivedParam = view === 'archived' ? 1 : 0;
    axios
      .get('/api/contacts', { params: { archived: archivedParam } })
      .then((res) => setContacts(res.data.data || res.data))
      .catch((err) => console.error(err));
  }, [view]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setEditingId(null);
    setFormErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    if (!subject) errors.subject = 'Subject is required';
    if (!message) errors.message = 'Message is required';

    if (Object.keys(errors).length === 0) {
      if (editingId) {
        axios
          .put(`/api/contacts/${editingId}`, { name, email, subject, message })
          .then((res) => {
            setContacts((prev) =>
              prev.map((contact) =>
                contact.id === editingId ? res.data.data : contact
              )
            );
            setToastMessage('✅ Contact updated successfully');
            resetForm();
          })
          .catch((err) => console.error(err));
      } else {
        axios
          .post('/api/contacts', { name, email, subject, message })
          .then((res) => {
            setContacts((prev) => [...prev, res.data.data]);
            setToastMessage('✅ Contact added successfully');
            resetForm();
          })
          .catch((err) => console.error(err));
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setName(contact.name);
    setEmail(contact.email);
    setSubject(contact.subject);
    setMessage(contact.message);
    setToastMessage(null);
  };

  // Archive (Active tab)
  const handleArchive = (id) => {
    if (window.confirm('Archive this contact?')) {
      axios
        .post(`/api/contacts/${id}/archive`)
        .then(() => {
          setContacts((prev) => prev.filter((c) => c.id !== id));
          setToastMessage('📂 Contact archived successfully');
        })
        .catch((err) => console.error(err));
    }
  };

  // Restore (Archived tab)
  const handleRestore = (id) => {
    if (window.confirm('Restore this contact?')) {
      axios
        .post(`/api/contacts/${id}/restore`)
        .then(() => {
          setContacts((prev) => prev.filter((c) => c.id !== id));
          setToastMessage('✅ Contact restored successfully');
        })
        .catch((err) => console.error(err));
    }
  };

  // Permanent delete (Archived tab)
  const handlePermanentDelete = (id) => {
    if (window.confirm('Permanently delete this contact?')) {
      axios
        .delete(`/api/contacts/${id}`)
        .then(() => {
          setContacts((prev) => prev.filter((c) => c.id !== id));
          setToastMessage('🗑️ Contact permanently deleted');
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="app-wrapper">
      <div className="header">
        <button
          className={view === 'active' ? 'btn primary' : 'btn'}
          onClick={() => setView('active')}
        >
          Active Contacts
        </button>
        <button
          className={view === 'archived' ? 'btn primary' : 'btn'}
          onClick={() => setView('archived')}
        >
          Archived Contacts
        </button>
      </div>

      {view === 'active' && (
        <div className="form-section">
          <div className="form-card">
            <h1>{editingId ? '✏️ Edit Contact' : '➕ Add Contact'}</h1>
            {toastMessage && <div className="toast">{toastMessage}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
                {formErrors.name && (
                  <span className="error">{formErrors.name}</span>
                )}
              </div>

              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@domain.com"
                />
                {formErrors.email && (
                  <span className="error">{formErrors.email}</span>
                )}
              </div>

              <div className="field">
                <label>Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject of the message"
                />
                {formErrors.subject && (
                  <span className="error">{formErrors.subject}</span>
                )}
              </div>

              <div className="field">
                <label>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message"
                />
                {formErrors.message && (
                  <span className="error">{formErrors.message}</span>
                )}
              </div>

              <div className="btn-group">
                <button type="submit" className="btn primary">
                  {editingId ? 'Update' : 'Add'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn cancel"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className="list-section">
        <h2>
          {view === 'active' ? '👥 Active Contacts' : '📂 Archived Contacts'}
        </h2>
        <div className="contacts-list">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div key={contact.id} className="contact-card">
                <div className="contact-info">
                  <h3>
                    {contact.name} <span>({contact.email})</span>
                  </h3>
                  <p><strong>Subject:</strong> {contact.subject}</p>
                  <p><strong>Message:</strong> {contact.message}</p>
                </div>

                <div className="actions">
                  {view === 'active' && (
                    <>
                      <button
                        onClick={() => handleEdit(contact)}
                        className="btn small edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleArchive(contact.id)}
                        className="btn small archive"
                      >
                        📂
                      </button>
                    </>
                  )}

                  {view === 'archived' && (
                    <>
                      <button
                        onClick={() => handleRestore(contact.id)}
                        className="btn small restore"
                      >
                        🔄
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(contact.id)}
                        className="btn small delete"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="empty">No contacts found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Example;
