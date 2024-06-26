export type Transaction = Counterparty & {
  id: number;
  komandirovka_id: number;
  account_number: string;
  transaction_id: string;
  operation_type: "Debit" | "Credit";
  operation_category: string;
  status: string;
  creation_date: string | null;
  authorization_date: string | null;
  transaction_date: string | null;
  original_operation_id: string;
  operation_amount_in_currency: string;
  operation_currency: string;
  amount_in_account_currency: string;
  counterparty_account: string;
  payment_purpose: string;
  payment_number: string;
  sequence: string;
  code: string;
  card_number: string;
  mcc: string;
  place_of_transaction_city: string;
  place_of_transaction_country: string;
  organization_address: string;
  bank: string;
  document_creator_status: string;
  budget_classification_code: string;
  oktmo_code: string;
  tax_payment_basis: string;
  tax_period_customs_code: string;
  tax_document_number: string;
  tax_document_date: string | null;
  tax_payment_type: string;

  confirmation_status: string;
};

export type Counterparty = {
  counterparty: string;
  counterparty_inn: string;
  counterparty_kpp: string;
  counterparty_bank_bik: string;
  counterparty_bank_corr_account: string;
  counterparty_bank_name: string;
};

export type ChartData = {
  date: string;
  debit: number;
  credit: number;
};
