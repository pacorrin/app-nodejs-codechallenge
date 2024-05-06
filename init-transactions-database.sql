-- Table: public.transactions

-- DROP TABLE IF EXISTS public.transactions;

CREATE TABLE IF NOT EXISTS public.transactions
(
    guid uuid NOT NULL DEFAULT uuid_generate_v4(),
    "accountExternalIdDebit" uuid NOT NULL,
    "accountExternalIdCredit" uuid,
    "tranferTypeId" smallint NOT NULL,
    value numeric NOT NULL,
    status smallint DEFAULT 1,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now(),
    CONSTRAINT transactions_pkey PRIMARY KEY (guid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.transactions
    OWNER to postgres;

COMMENT ON COLUMN public.transactions.status
    IS '1 = Pending
2 = Approved
3 = Rejected';