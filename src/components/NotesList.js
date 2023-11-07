import React, { useState,useEffect } from 'react';
import styles from './List.module.css';
import { saveToLocalStorage, getFromLocalStorage } from './StorageUtils';


const NotesList = ({ handleGroupClick }) => {
  let [modalOpen, setModalOpen] = useState(false);
  // let [notes, setNotes] = useState([]);
  const [notes, setNotes] = useState(getFromLocalStorage('notes') || []);
  let [groupName, setGroupName] = useState('');
  let [selectedColor, setSelectedColor] = useState(''); 
  let [selectedNoteIndex, setSelectedNoteIndex] = useState(null);


  const handleClick = () => {
    setModalOpen(true);

  }

  const handleNoteItemClick = (index,note) => {
    setSelectedNoteIndex(note);
  }

  useEffect(() => {
    saveToLocalStorage('notes', notes);
  }, [notes]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      setModalOpen(false);
    }
  }

  const handleChange = (e) => {
    setGroupName(e.target.value);
  }

  const handleColorClick = (color) => {
    setSelectedColor(color);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName || !selectedColor) {
      alert('Please enter a group name and choose a color.');
      return;
    }
    setNotes([...notes, { name: groupName, color: selectedColor }]);
    setModalOpen(false);
    setGroupName('');
    setSelectedColor(''); 
  }

  return (
    <>
    <div style={{width:'30vw'}}>
    <div className={styles.appName}>
        <span style={{fontWeight:'700'}}>Pocket Notes</span>
      </div>
      <button className={styles.noteButton} onClick={handleClick}><span className={styles.buttonSpan}>+ Create Notes Group</span></button>
      <div>

        {modalOpen && (
          <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
              <div style={{ margin: '10px' }}>
                <span className={styles.modalText}>Create New Notes Group</span>
              </div>
              <div style={{ marginLeft: '20px' }}>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className={styles.modalText}>Group Name</label>
                    <input
                      className={styles.modalInput}
                      placeholder='Enter your group name'
                      value={groupName}
                      onChange={handleChange}
                    />
                  </div>
                  <div style={{ display: 'flex' }}>
                    <label className={styles.modalText}>Choose Color</label>
                    <div className={styles.chooseColor}>
                      <div className={styles.purple} onClick={() => handleColorClick('#B38BFA')}></div>
                      <div className={styles.pink} onClick={() => handleColorClick('#FF79F2')}></div>
                      <div className={styles.skyBlue} onClick={() => handleColorClick('#43E6FC')}></div>
                      <div className={styles.orange} onClick={() => handleColorClick('#F19576')}></div>
                      <div className={styles.blue} onClick={() => handleColorClick('#0047FF')}></div>
                      <div className={styles.cobaltBlue} onClick={() => handleColorClick('#6691FF')}></div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <button className={styles.createButton} type="submit">Create</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div  className={`${styles.groupList} ${styles.scrollable}`}>
          {notes.map((note, index) => (
            <div key={index} className={`${styles.noteItem} ${selectedNoteIndex === index ? styles.selected : ''}`} onClick={()=>{handleNoteItemClick(index);handleGroupClick(index,note.name);}}>
            <div className={styles.noteColor} style={{ background: note.color }}>
             {note.name.split(' ').slice(0, 2).map(word => word[0]).join('')} 
              </div>
              <div className={styles.noteDetails}>
                <div className={styles.noteName}>{note.name}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
      
    </>
  );
}

export default NotesList;
