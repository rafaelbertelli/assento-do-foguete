import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function publishedDateFormatted(publishedAt) {
  return format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
}

export function dateFormatted(publishedAt) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(publishedAt);
}

export function publishedDateRelativeToNow(publishedAt) {
  return formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });
}
