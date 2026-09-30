import { AgendaItem as AgendaItemType } from '@/data/agenda';
import { SessionTypeBadge } from '@/components/ui/Badge';
import { MapPin } from '@phosphor-icons/react/dist/ssr/MapPin';
import { getDurationString, formatTimeRange } from '@/lib/utils';

interface AgendaItemProps {
  item: AgendaItemType;
  locale: string;
}

const typeColors: Record<string, string> = {
  keynote: '#00A383',
  conference: '#20FEFD',
  panel: '#A9B300',
  workshop: '#1BC868',
  networking: '#4A4944',
  demo: '#D0DC00',
  awards: '#00A383'
};

export default function AgendaItemComponent({ item, locale }: AgendaItemProps) {
  const title = locale === 'fr' ? item.title.fr : item.title.en;
  const description = item.description ? (locale === 'fr' ? item.description.fr : item.description.en) : undefined;
  const room = item.room ? (locale === 'fr' ? item.room.fr : item.room.en) : undefined;
  const color = typeColors[item.type] || '#4A4944';

  return (
    <div className="flex gap-4 group">
      {/* Timeline line */}
      <div className="flex flex-col items-center flex-shrink-0 w-16">
        <div className="text-xs font-mono text-geo-ink-soft text-right w-full">
          {item.time}
        </div>
        <div
          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <div className="w-px flex-1 mt-1" style={{ backgroundColor: `${color}30` }} />
      </div>

      {/* Content */}
      <div className="glass-2027 rounded-xl p-4 flex-1 mb-4 hover:bg-geo-ink/5 transition-colors">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <SessionTypeBadge type={item.type} locale={locale} />
            <span className="text-xs text-geo-ink-soft">
              {getDurationString(item.duration, locale)}
            </span>
            {item.track && (
              <span className="text-xs text-geo-ink-soft px-2 py-0.5 rounded-full border border-geo-ink/10">
                {item.track}
              </span>
            )}
          </div>
          {room && (
            <span className="text-xs text-geo-ink-soft flex-shrink-0 hidden sm:flex items-center gap-1">
              <MapPin size={14} weight="light" aria-hidden="true" />{room}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-geo-ink text-sm sm:text-base leading-snug mb-1">
          {title}
        </h3>

        {item.speakerNames && item.speakerNames.length > 0 && (
          <p className="text-sm text-geo-teal-dark/80 font-medium mb-1">
            {item.speakerNames.join(' · ')}
          </p>
        )}

        {description && (
          <p className="text-xs text-geo-ink-soft leading-relaxed line-clamp-2 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
