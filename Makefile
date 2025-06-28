release:
	git tag -a v$(TAG) -m "v$(TAG)"
	git push origin v$(TAG)

	git tag -a sum/v$(TAG) -m "v$(TAG)"
	git push origin sum/v$(TAG)
