import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((c) => {
              const dateTime = Intl.DateTimeFormat("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(c.startDate));

              const timeCalculated = formatDistanceToNow(c.startDate, {
                locale: ptBR,
                addSuffix: true,
              });

              return (
                <tr key={c.id}>
                  <td>{c.task}</td>
                  <td>{c.minutesAmount} minutos</td>
                  <td>
                    <time dateTime={dateTime} title={dateTime}>
                      {timeCalculated}
                    </time>
                  </td>
                  <td>
                    {c.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {c.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!c.finishedDate && !c.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              );
            })}

            {/* <tr>
              <td>Tarefa 1</td>
              <td>20 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr> */}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
