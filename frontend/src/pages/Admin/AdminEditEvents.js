import React, { useState } from 'react';
import Events from '../../components/AdminEvents/Events';
import AdminEventForm from '../../components/AdminEventForm/AdminEventForms';
import styles from "./styles.module.css";

const AdminEditEvents = () => {
  const [currentId, setcurrentId] = useState(null);
  return (
    <div className={styles.admin_edit_main}>
      <div className={styles.admin_edit_events}>
        <Events setcurrentId={setcurrentId} currentId={currentId} />
      </div>
      <div className={styles.admin_edit_form}>
        <AdminEventForm setcurrentId={setcurrentId} currentId={currentId} />
      </div>
    </div>
  );
};

export default AdminEditEvents;
