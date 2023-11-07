import React, { useState,useEffect } from 'react';
import styles from './Notes.module.css';
import banner from '../assets/pocket_notes.png';
import submitNote from '../assets/Vector.svg';
import backArrow from '../assets/backArrow.svg';
import { saveToLocalStorage, getFromLocalStorage } from './StorageUtils';

const CreateNotes = ({ hideBanner, openGroup, selectGroup, handleBackClick  }) => {
  
  const [groupText, setGroupText] = useState(getFromLocalStorage('groupText') || {});
  const [groupNotes, setGroupNotes] = useState(getFromLocalStorage('groupNotes') || {});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  // useEffect(() => {
  //   localStorage.setItem('groupText', JSON.stringify(groupText));
  //   localStorage.setItem('groupNotes', JSON.stringify(groupNotes));
  // }, [groupText, groupNotes]);




  useEffect(() => {
    saveToLocalStorage('groupText', groupText);
    saveToLocalStorage('groupNotes', groupNotes);
  }, [groupText, groupNotes]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTextareaChange = (groupId, newText) => {
    setGroupText({ ...groupText, [groupId]: newText });
  };


const handleSubmitNote = () => {
  const currentTime = new Date();
  const day = currentTime.getDate();
  const month = currentTime.toLocaleString('en-US', { month: 'long' });
  const year = currentTime.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const formattedTime = currentTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  const noteText = groupText[selectGroup] || '';

  const newNote = (
    <div style={{ display: 'flex', margin: '20px' }}>
      <div>
        <div>{formattedTime}</div>
        <div style={{ marginTop: '4px' }}>{formattedDate}</div>
      </div>
      <div style={{ margin: '0 20px', wordBreak: 'break-word' }}>
        {noteText}
      </div>
    </div>
  );

  setGroupNotes({ ...groupNotes, [selectGroup]: [...(groupNotes[selectGroup] || []), newNote] });
  setGroupText({ ...groupText, [selectGroup]: '' });
};


return (
    <>
      <div className={styles.container}>
        {hideBanner && (
          <div className={styles.banner}>
            <div>
              <img src={banner} alt="Pocket Notes" />
            </div>
            <p>Pocket Notes</p>
            <p>Send and receive messages without keeping your phone online.
Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          </div>
  
        )}
  {
    !hideBanner &&
   <div className={styles.noteGroupName}>
   {windowWidth<=768  &&

<>

      <img src={backArrow} alt='backArrow' onClick={handleBackClick} style={{width:'20px'}}></img>
      
      
         </>

   }
   </div>
  }
        
  
        <div className={styles.scrollable}>
          {groupNotes[selectGroup]?.map((note, index) => (
            <div key={index} style={{fontWeight:'600'}}>{note}</div>
          ))}
        </div>

        {openGroup && (
          <>
          <div className={styles.borderBox}>
            <textarea
              value={groupText[selectGroup] || ''}
              onChange={(e) => handleTextareaChange(selectGroup, e.target.value)}
              name="noteTextArea"
            />
            <img
              className={styles.submitButton}
              src={submitNote}
              alt="submitNote"
              onClick={handleSubmitNote}
            />
          </div>
          </>
        )}
  
      </div>
    </>
  );
};

export default CreateNotes;
