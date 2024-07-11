import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">R$12.000,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>
                <time dateTime={"2021-03-31"}>
                  {new Date("2021-03-31").toLocaleDateString()}
                </time>
              </td>
            </tr>
            <tr>
              <td width="50%">Hamburguer</td>
              <td>
                <PriceHighlight variant="outcome">- R$59,00</PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>
                <time dateTime={"2022-04-10"}>
                  {new Date("2022-04-10").toLocaleDateString()}
                </time>
              </td>
            </tr>
            <tr>
              <td width="50%">Aluguel do apartamento</td>
              <td>
                <PriceHighlight variant="outcome">- R$1.200,00</PriceHighlight>
              </td>
              <td>Casa</td>
              <td>
                <time dateTime={"2022-03-27"}>
                  {new Date("2022-03-27").toLocaleDateString()}
                </time>
              </td>
            </tr>
            <tr>
              <td width="50%">Computador</td>
              <td>
                <PriceHighlight variant="outcome">- R$5.400,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>
                <time dateTime={"2022-03-15"}>
                  {new Date("2022-03-15").toLocaleDateString()}
                </time>
              </td>
            </tr>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">R$8.000,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>
                <time dateTime={"2022-03-13"}>
                  {new Date("2022-03-13").toLocaleDateString()}
                </time>
              </td>
            </tr>
            <tr>
              <td width="50%">Janta</td>
              <td>
                <PriceHighlight variant="income">R$39,00</PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>
                <time dateTime={"2022-03-10"}>
                  {new Date("2022-03-10").toLocaleDateString()}
                </time>
              </td>
            </tr>
            <tr>
              <td width="50%">Aluguel do apartamento</td>
              <td>
                <PriceHighlight variant="outcome">- R$1.200,00</PriceHighlight>
              </td>
              <td>Casa</td>
              <td>
                <time dateTime={"2022-02-27"}>
                  {new Date("2022-02-27").toLocaleDateString()}
                </time>
              </td>
            </tr>
            <tr>
              <td width="50%">Salário</td>
              <td>
                <PriceHighlight variant="income">R$5.400,00</PriceHighlight>
              </td>
              <td>Salário</td>
              <td>
                <time dateTime={"2022-02-15"}>
                  {new Date("2022-02-15").toLocaleDateString()}
                </time>
              </td>
            </tr>
            <tr>
              <td width="50%">Almoço</td>
              <td>
                <PriceHighlight variant="outcome">- R$30,00</PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>
                <time dateTime={"2022-02-05"}>
                  {new Date("2022-02-05").toLocaleDateString()}
                </time>
              </td>
            </tr>
            <tr>
              <td width="50%">Fone de ouvido</td>
              <td>
                <PriceHighlight variant="outcome">- R$150,00</PriceHighlight>
              </td>
              <td>Itens</td>
              <td>
                <time dateTime={"2022-02-02"}>
                  {new Date("2022-02-02").toLocaleDateString()}
                </time>
              </td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
