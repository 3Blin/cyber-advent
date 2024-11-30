# Cyber-Adventskalender Installation Guide

## Installation in korrekter Reihenfolge

### 1. Systemvoraussetzungen installieren
```bash
# System-Pakete aktualisieren
sudo apt update

# Node.js Repository hinzufügen
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Node.js und npm installieren
sudo apt-get install -y nodejs

# Versionen prüfen
node --version  # Sollte 20.x oder höher sein
npm --version   # Sollte 10.x oder höher sein
```

### 2. Repository Setup
```bash
# Repository klonen (nur bei Erstinstallation)
git clone https://github.com/3Blin/cyber-advent.git
cd cyber-advent
```

### 3. Frontend Erstinstallation

```bash
# Next.js Projekt erstellen
npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Während der Installation werden folgende Fragen gestellt:
# Would you like to use TypeScript? → Yes
# Would you like to use ESLint? → Yes
# Would you like to use Tailwind CSS? → Yes
# Would you like to use `src/` directory? → Yes
# Would you like to use App Router? → Yes
# Would you like to customize the default import alias (@/*)? → Yes

# In das Frontend-Verzeichnis wechseln
cd frontend

# Zusätzliche Dependencies installieren
npm install lucide-react @types/react @types/node
```

### 4. Komponenten erstellen
Nachdem das Grundgerüst steht, müssen die Komponenten in der richtigen Reihenfolge erstellt werden:

1. **RootLayout Component** erstellen (`src/components/layout/RootLayout.tsx`):
```tsx
'use client';

import { useState } from 'react';
import { Terminal, Calendar, Book, Settings, HelpCircle } from 'lucide-react';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  // ... (kompletter Code wie vorher)
};

export default RootLayout;
```

2. **App Layout** anpassen (`src/app/layout.tsx`):
```tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cyber-Adventskalender',
  description: 'Ein interaktiver Adventskalender für junge IT-Enthusiasten',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

3. **Homepage** erstellen (`src/app/page.tsx`):
```tsx
import RootLayout from '@/components/layout/RootLayout';

export default function Home() {
  return (
    <RootLayout>
      <div className="text-white">
        <h1 className="text-2xl font-bold">Willkommen beim Cyber-Adventskalender</h1>
        <p className="mt-4">Entdecke die spannende Welt der IT-Sicherheit!</p>
      </div>
    </RootLayout>
  );
}
```

### 5. Entwicklungsserver starten
```bash
# Im frontend Verzeichnis
npm run dev
```
Der Server ist dann unter http://localhost:3000 erreichbar.

### 6. Bei Problemen mit den Dependencies
```bash
cd frontend
rm -rf node_modules
rm package-lock.json
npm install
```

## Produktions-Deployment

### 1. Produktions-Build erstellen
```bash
cd frontend
npm run build
```

### 2. Produktionsserver starten
```bash
npm run start
```

## Versionierung und Kompatibilität
- Node.js: 20.x
- npm: 10.x
- Next.js: 14.x
- React: 18.x
- TypeScript: 5.x

## Verzeichnisstruktur nach erfolgreicher Installation
```
cyber-advent/
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx        # Haupt-Layout
    │   │   ├── page.tsx          # Hauptseite
    │   │   └── globals.css       # Globale Styles
    │   └── components/
    │       └── layout/
    │           └── RootLayout.tsx # Layout-Komponente
    ├── package.json
    ├── tailwind.config.js
    └── tsconfig.json
```

## Git-Workflow

Nach erfolgreicher Installation und Änderungen:
```bash
git add .
git commit -m "Beschreibung der Änderungen"
git push origin main
```
