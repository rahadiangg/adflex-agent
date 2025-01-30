package main

type Getter interface {
	Get(source, destination string) error
}

type GetterBuilder struct {
	g Getter
}

func NewGetterBuilder(g Getter) *GetterBuilder {
	return &GetterBuilder{
		g: g,
	}
}

func (s *GetterBuilder) Get(source, destination string) error {
	return s.g.Get(source, destination)
}
