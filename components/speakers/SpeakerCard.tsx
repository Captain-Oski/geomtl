import Link from 'next/link';
import { Speaker } from '@/data/speakers';
import Badge from '@/components/ui/Badge';

interface SpeakerCardProps {
  speaker: Speaker;
  locale: string;
}

export default function SpeakerCard({ speaker, locale }: SpeakerCardProps) {
  const title = locale === 'fr' ? speaker.title.fr : speaker.title.en;
  const topics = locale === 'fr' ? speaker.topics.fr : speaker.topics.en;

  return (
    <Link
      href={`/${locale}/conferenciers/${speaker.slug}`}
      className="block glass rounded-2xl p-6 card-hover group"
    >
      <div className="flex flex-col items-center text-center">
        {/* Photo placeholder */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white mb-4 transition-transform duration-200 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${speaker.color}40, ${speaker.color}80)`,
            border: `2px solid ${speaker.color}40`
          }}
        >
          {speaker.initials}
        </div>

        <h3 className="font-bold text-white text-base group-hover:text-rose-geo transition-colors mb-1">
          {speaker.name}
        </h3>
        <p className="text-sm text-mid-gray line-clamp-2 mb-1">{title}</p>
        <p className="text-xs text-rose-geo/80 font-medium mb-4">{speaker.organization}</p>

        {/* Day badge */}
        {speaker.day && (
          <span className="text-xs text-mid-gray mb-3">
            {locale === 'fr' ? `Jour ${speaker.day}` : `Day ${speaker.day}`}
          </span>
        )}

        {/* Topics */}
        <div className="flex flex-wrap gap-1 justify-center">
          {topics.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="rose" size="sm">
              {topic}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
