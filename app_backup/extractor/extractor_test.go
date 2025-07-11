package extractor

import (
	"reflect"
	"testing"
)

func TestPackageList(t *testing.T) {
	tests := []struct {
		name string
		data string
		want []string
	}{
		{
			name: "Fetch Package List",
			data: "package:org.baldeweg.app\npackage:org.baldeweg.app2",
			want: []string{"org.baldeweg.app", "org.baldeweg.app2"},
		},
		{
			name: "Empty Package List",
			data: "",
			want: []string{},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := ListApps(tt.data)

			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("PackageList() = %v, want %v", got, tt.want)
			}
		})
	}
}
