import DiningVoteSystem from '@/components/DiningVoteSystem';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gray-50">
      <DiningVoteSystem />
    </main>
  );
}