import React, { useState,useEffect } from 'react'
import NotesList from '../components/NotesList'
import CreateNotes from '../components/CreateNotes'
import styles from './Main.module.css'

const Notes = () => {

let [selectGroup, setSelectGroup] = useState(null)
let [hideBanner, setHideBanner] = useState(true)
let [openGroup, setOpenGroup] = useState(false)
let [windowWidth, setWindowWidth] = useState(window.innerWidth);


const handleGroupClick = (index,note) => {
  setSelectGroup(index)
  setHideBanner(false)
  setOpenGroup(true)

}

const handleBackClick = () => {
  setOpenGroup(false);
};

useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);


  return (
    <>
 

    <div className={styles.main}>
    {windowWidth >900 && !openGroup ?
    <>
      <NotesList handleGroupClick={handleGroupClick} />
      <CreateNotes hideBanner={hideBanner} selectGroup={selectGroup}  />
      </>
      :
      windowWidth > 900 && openGroup ?
      <>
      <NotesList handleGroupClick={handleGroupClick} />
      </>
      :
      null
    }


      {windowWidth <= 900 && !openGroup && (
        <NotesList handleGroupClick={handleGroupClick} />
      )}
      {openGroup ? (
        <CreateNotes handleBackClick={handleBackClick} hideBanner={hideBanner} openGroup={openGroup} selectGroup={selectGroup} />
      ) : null}
    </div>

    
 
      </>
  )
}

export default Notes
