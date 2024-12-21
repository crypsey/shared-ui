# Crypsey Shared UI Components

A modern React component library providing reusable UI components for web applications.

## Installation

```bash
npm install crypsey-shared-ui-lib
```

## Quick Start

```jsx
import { Button } from "crypsey-shared-ui-lib";

function App() {
  return (
    <Button variant="primary" onClick={() => console.log("clicked")}>
      Click me
    </Button>
  );
}
```

## Available Components

### Button

A flexible button component that supports different variants and states.

```jsx
import { Button } from 'crypsey-shared-ui-lib';

// Primary button
<Button variant="primary">Primary Button</Button>

// Secondary button
<Button variant="secondary">Secondary Button</Button>
```

#### Props

| Prop     | Type                     | Default   | Description                                  |
| -------- | ------------------------ | --------- | -------------------------------------------- |
| variant  | 'primary' \| 'secondary' | 'primary' | The visual style variant of the button       |
| children | React.ReactNode          | -         | The content to be rendered inside the button |
| onClick  | () => void               | -         | Function called when the button is clicked   |

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
