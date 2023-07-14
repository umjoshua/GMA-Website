import React, { useState, useEffect } from 'react';
import styles from "./styles.module.css";
import AddCommittee from '../../components/AdminCommittee/AddCommittee';
import DeleteIcon from '@mui/icons-material/Delete';
import * as api from '../../api';
import Avatar from '../../assets/images/avatar.png'

const AdminEditCommittee = () => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    };

    const [committee, setCommittee] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [selectedCommitteeId, setSelectedCommitteeId] = useState(null);
    const [addCommittee, setAddCommittee] = useState(false);

    const deleteMember = async () => {
        if (selectedCommitteeId) {
            try {
                const response = await api.deleteCommittee(selectedCommitteeId, config);
                console.log(response);
                if (response.status === 200) {
                    setCommittee(prevCommittee => prevCommittee.filter(item => item._id !== selectedCommitteeId));
                    setDeleteConfirmation(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.fetchCommittee();
                setCommittee(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [addCommittee]);

    const openDeleteConfirmation = (id) => {
        setSelectedCommitteeId(id);
        setDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => {
        setSelectedCommitteeId(null);
        setDeleteConfirmation(false);
    };

    const Committee = ({ item }) => {
        return (
            <div className="commitee_container" style={{ minHeightheight: 'max-content' }}>
                <div className="committee_image">
                    <img src={item.file ? item.file : Avatar} alt="Profile" />
                </div>
                <div className="committee_content" style={{ height: 'max-content' }}>
                    <span className="p_name">{item.name}</span>
                    <span className="po_name">{item.position}</span>
                </div>
                <div>
                    <DeleteIcon
                        onClick={() => openDeleteConfirmation(item._id)}
                        style={{ color: 'red', cursor: 'pointer' }}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.committee_main}>
            <div>
                <div className="committe_cards">
                    {committee.map((item, key) => (
                        <Committee item={item} key={key} />
                    ))}
                </div>
            </div>
            <AddCommittee addCommittee={addCommittee} setAddCommittee={setAddCommittee} setCommittee={setCommittee} />

            {deleteConfirmation && (
                <div className={styles.confirmation_dialog}>
                    <div className={styles.confirmation_content}>
                        <h2>Confirmation</h2>
                        <p>Are you sure you want to delete this committee member?</p>
                        <div className={styles.confirmation_buttons}>
                            <button className={styles.confirmation_button} onClick={deleteMember}>
                                Yes, Delete
                            </button>
                            <button className={styles.confirmation_button} onClick={closeDeleteConfirmation}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEditCommittee;
