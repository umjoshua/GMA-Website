import React, { useState, useEffect } from 'react';
import Events from '../../components/AdminEvents/Events';
import AdminEventForm from '../../components/AdminEventForm/AdminEventForms';
import styles from "./styles.module.css";
import AddIcon from '@mui/icons-material/Add';
import AdminEventView from '../../components/AdminEventView/AdminEventView';
import * as api from '../../api'

const AdminEditEvents = () => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.fetchEvents();
      setEvents(response.data);
    };
    fetchData();
  }, [])

  const [currentId, setcurrentId] = useState(null);
  const [addEvent, setAddEvent] = useState(false);
  const [viewEvent, setViewEvent] = useState(false);
  return (
    <div className={styles.admin_edit_main}>
      {!addEvent && !viewEvent && < div className={styles.admin_edit_events}>
        <Events events={events} setAddEvent={setAddEvent} setcurrentId={setcurrentId} currentId={currentId} setViewEvent={setViewEvent} />
      </div>}
      <div className={styles.add_event_icon} style={{ visibility: addEvent ? "hidden" : "visible" }}
        onClick={() => setAddEvent(true)}
      >
        <AddIcon style={{ color: "white" }} />
      </div>
      {
        addEvent &&
        <div className={styles.add_post_form}>
          <AdminEventForm events={events} setAddEvent={setAddEvent} setcurrentId={setcurrentId} currentId={currentId} />
        </div>
      }
      {
        viewEvent && <div className={styles.add_post_form}>
          <AdminEventView events={events} setViewEvent={setViewEvent} setcurrentId={setcurrentId} currentId={currentId} />
        </div>
      }
    </div >
  );
};

export default AdminEditEvents;
