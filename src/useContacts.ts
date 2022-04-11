import React from 'react';
import apiData from './api';

export enum ApiStatus {
  OK = 'ok',
  PENDING = 'pending',
  ERROR = 'error'
}

type Person = {
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
  id: string
}

export const useContacts = () => {
  const [contacts, setContacts] = React.useState<Person[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [status, setStatus] = React.useState(ApiStatus.OK)

  const fetchContacts = React.useCallback(async () => {
    setStatus(ApiStatus.PENDING)
    try {
      const response = await apiData()
      setContacts(prev => [...prev, ...response])
      setStatus(ApiStatus.OK)
    } catch(e) {
      setStatus(ApiStatus.ERROR)
    } 
  }, [currentPage])

  React.useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const selectContact = React.useCallback((personId: string) => {
    if (selected.includes(personId)) {
      const newSelected = selected.filter((id) => id !== personId)

      setSelected(newSelected)
    } else {
      setSelected([...selected, personId])
    }
  }, [selected])

  const loadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  return { contacts, selected, status, selectContact, loadMore }
}