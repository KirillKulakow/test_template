import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiEdit } from "react-icons/fi";
import { VscSave } from "react-icons/vsc";
import { AiOutlineStop } from "react-icons/ai";

const EventButton = ({ name = "Registration", event = "conversion", conversionID = "64df58ff50b99553300cb7b7", audienceID = "64d5f9602c6125623a143075", eventId = "some_event", eventValue = "" }) => {
    const [isEdit, setEdit] = useState(false);
    const [initialValues, setInitialValues] = useState({ event, eventId, conversionID, audienceID, eventValue });
    const [editForm, setEditForm] = useState({ event, eventId, conversionID, audienceID, eventValue });
    const sendEv = () => {
        const { event, eventId, conversionID, audienceID, eventValue } = initialValues;
        window.BMDataLayer = window.BMDataLayer || [];
        window.BMDataLayer.push(event === "conversion" ? { conversionID, eventId, eventValue, event } : { audienceID, event, eventId });
    };
    const saveOpts = () => {
        setInitialValues(editForm);
        setEdit(false);
    };
    const devOpts = () => {
        setEditForm(initialValues);
        setEdit(false);
    };
    return (
        <>
            <button className="" onClick={sendEv} disabled={isEdit}>{name}</button>
            {!isEdit && <FiEdit onClick={() => setEdit(true)}/>}
            {isEdit && (
                <div>
                    <label>
                        Event Type
                        <select className="ml-3 mb-5" defaultValue={initialValues.event} onChange={(e) => setEditForm({ ...editForm, event: e.target.value })}>
                            <option value="conversion">Conversion</option>
                            <option value="action">Audience</option>
                        </select>
                    </label>
                    <br/>
                    <label>
                        Event ID
                        <input className="ml-3 mb-5" value={initialValues.eventId} onChange={(e) => setEditForm({ ...editForm, eventId: e.target.value })}/>
                    </label>
                    <br/>
                    <label>
                        Event Value
                        <input className="ml-3 mb-5" value={initialValues.eventValue} onChange={(e) => setEditForm({ ...editForm, eventValue: e.target.value })}/>
                    </label>
                    <br/>
                    <label>
                        Conversion ID
                        <input className="ml-3 mb-5" value={initialValues.conversionID} onChange={(e) => setEditForm({ ...editForm, conversionID: e.target.value })}/>
                    </label>
                    <br/>
                    <label>
                        Audience ID
                        <input className="ml-3 mb-5" value={initialValues.audienceID} onChange={(e) => setEditForm({ ...editForm, audienceID: e.target.value })}/>
                    </label>
                    <br/>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <VscSave onClick={saveOpts} size={20}/>
                        <AiOutlineStop className="ml-5" onClick={devOpts} size={20}/>
                    </div>
                </div>
            )}
        </>
    );
};

EventButton.propTypes = {
    name: PropTypes.string,
    event: PropTypes.oneOf(["conversion","action"]),
    conversionID: PropTypes.string,
    audienceID: PropTypes.string,
    eventName: PropTypes.string,
    eventValue: PropTypes.string
};

export default EventButton;
