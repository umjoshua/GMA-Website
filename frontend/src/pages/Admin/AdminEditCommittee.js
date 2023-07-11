import React, { useState, useEffect } from 'react'
import styles from "./styles.module.css";
import AddCommittee from '../../components/AdminCommittee/AddCommittee';
import DeleteIcon from '@mui/icons-material/Delete';
import * as api from '../../api'

const AdminEditCommittee = () => {
    const Committee = ({ item }) => {
        return (
            <div className="commitee_container">
                <div className="committee_image" >
                    <img src={item.file} alt="Profile" className='' style={{ height: '100%', width: '200px', objectFit: 'cover' }} />
                </div>
                <div className="committee_content">
                    <span className="p_name">{item.name}</span>
                    <span className="po_name">{item.position}</span>
                </div>
                <div>
                    <DeleteIcon />
                </div>
            </div>
        );
    }

    const [committee, setCommittee] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.fetchCommittee();
            setCommittee(response.data);
        };
        fetchData();
    }, [])

    const [addCommittee, setAddCommittee] = useState(false);

    return (
        <div className={styles.committee_main}>
            <div>
                <div className="committe_cards">
                    {committee.map((item, key) => {
                        return <Committee item={item} key={key} />;
                    })}
                </div>
            </div>
            <AddCommittee addCommittee={addCommittee} setAddCommittee={setAddCommittee} />
        </div>
    )
}

export default AdminEditCommittee