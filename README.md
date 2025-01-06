# Crypsey Shared UI Components

A modern React component library providing reusable UI components for web applications, with a focus on cryptocurrency payment and transaction management interfaces.

## Installation

```bash
npm install crypsey-shared-ui-lib
```

## Quick Start

```jsx
import { Header, CryptoPayment } from "crypsey-shared-ui-lib";

function App() {
  return (
    <>
      <Header title="My Crypto App" />
      <CryptoPayment onPaymentComplete={(details) => console.log(details)} />
    </>
  );
}
```

## Available Components

### Header

A responsive header component for consistent navigation across your application.

```jsx
import { Header } from "crypsey-shared-ui-lib";

<Header
  title="Dashboard"
  showNavigation={true}
  userProfile={{
    name: "John Doe",
    avatar: "path/to/avatar.jpg",
  }}
/>;
```

### CryptoPayment

A comprehensive payment component that handles cryptocurrency transactions.

```jsx
import { CryptoPayment } from "crypsey-shared-ui-lib";

<CryptoPayment
  amount={100}
  currency="USD"
  onPaymentComplete={(transaction) => {
    console.log("Payment completed:", transaction);
  }}
/>;
```

### EmptyState

A component for displaying placeholder content when no data is available.

```jsx
import { EmptyState } from "crypsey-shared-ui-lib";

<EmptyState
  title="No Transactions"
  description="You haven't made any transactions yet."
  icon="wallet"
/>;
```

### HeroContent

A hero section component for featuring important content or calls-to-action.

```jsx
import { HeroContent } from "crypsey-shared-ui-lib";

<HeroContent
  title="Welcome to Crypto Payments"
  subtitle="Fast, secure, and seamless cryptocurrency transactions"
  ctaText="Get Started"
  onCtaClick={() => {}}
/>;
```

### RecentActivity

Displays a list of recent cryptocurrency transactions or activities.

```jsx
import { RecentActivity } from "crypsey-shared-ui-lib";

<RecentActivity
  transactions={transactions}
  onTransactionClick={(tx) => {
    console.log("Transaction clicked:", tx);
  }}
/>;
```

### UserTransactions

A detailed view of user transaction history with filtering and sorting capabilities.

```jsx
import { UserTransactions } from "crypsey-shared-ui-lib";

<UserTransactions
  userId="user123"
  filters={{
    dateRange: "last30Days",
    status: "completed",
  }}
/>;
```

### CryptoPaymentSelector

A component for selecting cryptocurrency payment methods and amounts.

```jsx
import { CryptoPaymentSelector } from "crypsey-shared-ui-lib";

<CryptoPaymentSelector
  availableCurrencies={["BTC", "ETH", "USDC"]}
  onCurrencySelect={(currency) => {
    console.log("Selected currency:", currency);
  }}
/>;
```

### ConfirmTransaction

A modal component for confirming transaction details before proceeding.

```jsx
import { ConfirmTransaction } from "crypsey-shared-ui-lib";

<ConfirmTransaction
  transaction={{
    amount: 1.5,
    currency: "ETH",
    recipient: "0x...",
  }}
  onConfirm={() => {}}
  onCancel={() => {}}
/>;
```

### TransactionModal Component

A React modal component for displaying cryptocurrency transaction details, built with Material-UI and Lucide React icons.

```jsx
import React, { useState } from "react";
import { TransactionModal } from "./components/TransactionModal";

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactionDetails = {
    recipient: "john.doe@example.com",
    amountCAD: 100.5,
    amountCrypto: 0.0034,
    cryptoSymbol: "BTC",
    status: "pending",
    currency: "CAD",
  };

  const handleContinue = () => {
    // Handle continue to payment logic
    console.log("Continuing to payment...");
  };

  return (
    <TransactionModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      transaction={transactionDetails}
      onContinue={handleContinue}
    />
  );
};
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/crypsey-shared-ui-lib.git

# Install dependencies
cd crypsey-shared-ui-lib
npm install

# Run Storybook
npm run storybook
```

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.
