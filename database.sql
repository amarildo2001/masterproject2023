CREATE TABLE IF NOT EXISTS schemaproject.users
(
    id integer NOT NULL DEFAULT nextval('schemaproject.users_id_seq'::regclass),
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    isadmin boolean NOT NULL DEFAULT false,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS schemaproject.reports
(
    id integer NOT NULL DEFAULT nextval('schemaproject.reports_id_seq'::regclass),
    userid integer,
    location geometry(Point) NOT NULL,
    type character varying(50) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    status character varying(20) COLLATE pg_catalog."default" NOT NULL,
    submittedat timestamp with time zone NOT NULL DEFAULT now(),
    approvedat timestamp with time zone,
    CONSTRAINT reports_pkey PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY (userid)
        REFERENCES schemaproject.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT reports_userid_fkey FOREIGN KEY (userid)
        REFERENCES schemaproject.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
