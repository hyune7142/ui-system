import { Button, ThemeProvider } from '@ui-system/core';

function App() {
  return (
    <ThemeProvider theme="custom-dark">
      <Button>Click me</Button>
    </ThemeProvider>
  );
}

export default App;
