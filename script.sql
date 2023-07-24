CREATE DATABASE rform;

CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "name" varchar(100),
  "lastname" varchar(255),
  "email" varchar(100),
  "created_at" TIMESTAMP DEFAULT NOW()
);

INSERT INTO "users" ("name", "lastname", "email")
VALUES ('Kevin', 'Kaarl', 'kevkaarl@example.com');
INSERT INTO "users" ("name", "lastname", "email")
VALUES ('Bryan', 'Smith', 'brsmith@example.com');

CREATE TABLE "form" (
  "form_id" SERIAL PRIMARY KEY,
  "title" varchar(255),
  "description" text,
  "user_id" INTEGER,
  "created_at" TIMESTAMP DEFAULT NOW(),
  CONSTRAINT "INTEGER_form.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "users"("user_id")
);

INSERT INTO "form" ("title", "description", "user_id")
VALUES ('Python Quiz', 'Read carefully and answer the following questions', 1);
INSERT INTO "form" ("title", "description", "user_id")
VALUES ('Java Junior Role', 'Read carefully and answer the following questions', 2);

CREATE TABLE "question" (
  "question_id" SERIAL PRIMARY KEY,
  "form_id" INTEGER,
  "question_text" text,
  "question_type" varchar(50),
  "puntuation" integer,
  "options" JSONB,
  "constraints" JSONB,
  "created_at" TIMESTAMP DEFAULT NOW(),
  CONSTRAINT "INTEGER_question.form_id"
    FOREIGN KEY ("form_id")
      REFERENCES "form"("form_id")
);

INSERT INTO "question" ("form_id", "question_text", "question_type", "puntuation", "options", "constraints")
VALUES (1, 'What is the purpose of a Python function?', 'multiple_choice', 10, '{"choices": ["To store data in the program", "To create classes and objects", "To perform a specific task or set of tasks", "To print output on the screen"], "correct_answers": [2]}', '{"required": true}');
INSERT INTO "question" ("form_id", "question_text", "question_type", "puntuation", "options", "constraints")
VALUES (1, 'What is a lambda function in Python?', 'multiple_choice', 10, '{"choices": ["A function that is defined using the def keyword", "A function that can be called from any part of the code", "A function that returns multiple values", "An anonymous function defined using the lambda keyword"], "correct_answers": [2]}', '{"required": true}');

CREATE TABLE "response" (
  "response_id" SERIAL PRIMARY KEY,
  "form_id" INTEGER,
  "user_id" INTEGER,
  "response_data" JSONB,
  "submitted_at" TIMESTAMP DEFAULT NOW(),
  CONSTRAINT "INTEGER_response.form_id"
    FOREIGN KEY ("form_id")
      REFERENCES "form"("form_id"),
  CONSTRAINT "INTEGER_response.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "users"("user_id")
);
INSERT INTO "response" ("form_id", "user_id", "response_data")
VALUES (1, 2, '{"q1": "2", "q2": "0"}');

CREATE TABLE "result" (
  "result_id" SERIAL PRIMARY KEY,
  "response_id" INTEGER,
  "score" integer,
  "n_corrects" integer,
  "n_incorrects" integer,
  "created_at" TIMESTAMP DEFAULT NOW()
);

INSERT INTO "result" ("response_id", "score", "n_corrects", "n_incorrects")
VALUES (1, 10, 1, 1);
