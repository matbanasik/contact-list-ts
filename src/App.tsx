import React from 'react';
import PersonInfo from './PersonInfo';
import { useContacts, ApiStatus } from './useContacts'

function App() {
  const { contacts, selected, status, loadMore, selectContact } = useContacts()

  return (
    <div className="App">
      <div className="selected-contacts">Selected contacts: {selected.length}</div>
      <div className="list">
        {contacts.map((personInfo) => (
          <PersonInfo key={personInfo.id} data={personInfo} handleCardSelect={selectContact} isSelected={selected.includes(personInfo.id)} />
        ))}
      </div>
      {status === ApiStatus.PENDING && <div className="loader" data-testid="loader" />}
      {status !== ApiStatus.PENDING && (
        <div className="load-button-wrapper">
          <button className="button load-more" type="button" onClick={loadMore} data-testid="load-more-button">Load more</button>
        </div>
      )}
    </div>
  );
}

export default App;
