import AdventCalendar from '@/components/calendar/AdventCalendar';
import RootLayout from '@/components/layout/RootLayout';

export default function CalendarPage() {
  return (
    <RootLayout>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-8">Cyber-Adventskalender</h1>
        <AdventCalendar />
      </div>
    </RootLayout>
  );
}
