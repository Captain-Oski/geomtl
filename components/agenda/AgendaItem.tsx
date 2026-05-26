import { AgendaItem as AgendaItemType } from '@/data/agenda';
import { SessionTypeBadge } from '@/components/ui/Badge';
import { getDurationString, formatTimeRange } from '@/lib/utils';

interface AgendaItemProps {
  item: AgendaItemType;
  locale: string;
}

const typeColors: Record<string, string> = {
  keynote: '#e91e8c',
  conference: '#5b9bd5',
  panel: '#ff6b35',
  workshop: '#10b981',
  networking: '#8896a8',
  demo: '#ffd60a',
  awards: '#e91e8c'
};

export default function AgendaItemComponent({ item, locale }: AgendaItemProps) {
  const title = locale === 'fr' ? item.title.fr : item.title.en;
  const description = item.description ? (locale === 'fr' ? item.description.fr : item.description.en) : undefined;
  const room = item.room ? (locale === 'fr' ? item.room.fr : item.room.en) : undefined;
  const color = typeColors[item.type] || '#8896a8';

  return (
    <div className="flex gap-4 group">
      {/* Timeline line */}
      <div className="flex flex-col items-center flex-shrink-0 w-16">
        <div className="text-xs font-mono text-mid-gray text-right w-full">
          {item.time}
        </div>
        <div
          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <div className="w-px flex-1 mt-1" style={{ backgroundColor: `${color}30` }} />
      </div>

      {/* Content */}
      <div className="glass rounded-xl p-4 flex-1 mb-4 hover:bg-white/5 transition-colors">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <SessionTypeBadge type={item.type} locale={locale} />
            <span className="text-xs text-mid-gray">
              {getDurationString(item.duration, locale)}
            </span>
            {item.track && (
              <span className="text-xs text-mid-gray px-2 py-0.5 rounded-full border border-white/10">
                {item.track}
              </span>
            )}
          </div>
          {room && (
            <span className="text-xs text-mid-gray flex-shrink-0 hidden sm:block">
              📍 {room}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-white text-sm sm:text-base leading-snug mb-1">
          {title}
        </h3>

        {item.speakerNames && item.speakerNames.length > 0 && (
          <p className="text-sm text-rose-geo/80 font-medium mb-1">
            {item.speakerNames.join(' · ')}
          </p>
        )}

        {description && (
          <p className="text-xs text-mid-gray leading-relaxed line-clamp-2 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
