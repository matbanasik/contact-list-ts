import React from 'react';
import App from './App';
import { render, waitFor, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockData from './mockData.json';
import * as apiModule from './api';

describe('App', () => {
  const fetchContactsMock = jest.spyOn(apiModule, 'default')

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  })

  it('properly fetches contacts and display them in a list', async () => {
    const contactsBatch = mockData.slice(0, 10)
    fetchContactsMock.mockResolvedValue(Promise.resolve(contactsBatch));

    const { getByTestId, getByText } = render(<App />);

    expect(getByTestId('loader')).toBeInTheDocument();

    await waitFor(() =>
      contactsBatch.forEach((contact) => {
        expect(getByText(contact.firstNameLastName)).toBeInTheDocument();
        expect(getByText(contact.emailAddress)).toBeInTheDocument();
      })
    );
  });

  it('allows user to load more contacts', async () => {
    const firstContactsBatch = mockData.slice(0, 10);
    const secondContactsBatch = mockData.slice(9, 10);

    fetchContactsMock.mockResolvedValue(Promise.resolve(firstContactsBatch));

    const { getByTestId, getByText } = render(<App />);

    await waitFor(() =>
      firstContactsBatch.forEach((contact) => {
        expect(getByText(contact.firstNameLastName)).toBeInTheDocument();
        expect(getByText(contact.emailAddress)).toBeInTheDocument();
      })
    );

    fireEvent(getByTestId('load-more-button'), new MouseEvent('click'));
    fetchContactsMock.mockResolvedValue(Promise.resolve(secondContactsBatch));

    await waitFor(() =>
      secondContactsBatch.forEach((contact) => {
        expect(getByText(contact.firstNameLastName)).toBeInTheDocument();
        expect(getByText(contact.emailAddress)).toBeInTheDocument();
      })
    );
  });

  it('allow user to select and deselect contact', async () => {
    const contactsBatch = mockData.slice(0, 10)
    fetchContactsMock.mockResolvedValue(contactsBatch)

    const { getByText } = render(<App />);

    await waitFor(async () => {
      fireEvent(getByText(contactsBatch[0].firstNameLastName), new MouseEvent('click'));

      waitFor(() => {
        expect(getByText('Selected contacts: 1')).toBeInTheDocument();
      })

      fireEvent(getByText(contactsBatch[0].firstNameLastName), new MouseEvent('click'));

      waitFor(() => {
        expect(getByText('Selected contacts: 0')).toBeInTheDocument();
      })
    });
  });
})