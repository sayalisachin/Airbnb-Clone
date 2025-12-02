import { useState } from 'react';
import { Header } from './components/Header';
import { ListingPage } from './pages/ListingPage';
import { DetailsPage } from './pages/DetailsPage';
import { mockListings } from './data/mockListings';

function App() {
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  const selectedListing = selectedListingId
    ? mockListings.find((l) => l.id === selectedListingId)
    : null;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {selectedListing ? (
        <DetailsPage
          listing={selectedListing}
          onBack={() => setSelectedListingId(null)}
        />
      ) : (
        <ListingPage onSelectListing={setSelectedListingId} />
      )}
    </div>
  );
}

export default App;
